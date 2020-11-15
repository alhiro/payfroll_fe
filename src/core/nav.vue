<template>
  <el-menu :default-active="activeLink" :mode="mode" @select="goto" :router="true" :collapse="isCollapse" :unique-opened="true" background-color="transparent" class="main-navigation-menu" :class="{'nav-collapsed':isCollapse}">
    <template v-for="(menu,id) in mainMenu.menus">
      <el-submenu v-if="menu.menuChild && menu.menuChild.length > 0" :key="id" :index="menu.menuLink" :set="parentMenu.includes(menu.menuLink) ? '' : parentMenu.push(menu.menuLink)">
        <template slot="title">
          <i :class="menu.menuIcon" class="icon-white"></i>
          <span slot="title"><b>{{menu.menuLabelEn}}</b></span>
        </template>
        <el-menu-item :index="item.menuLink" v-for="(item,idx) in menu.menuChild" :key="idx">
          <i class="dot" /><span slot="title" :set="subMenu.includes(item.menuLink) ? '' : subMenu.push(item.menuLink)"><b>{{item.menuLabelEn}}</b></span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.menuLink" :key="id" :set="parentMenu.includes(menu.menuLink) ? '' : parentMenu.push(menu.menuLink)">
        <i :class="menu.menuIcon"></i><span slot="title"><b>{{menu.menuLabelEn}}</b></span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import {
  detect
} from 'detect-browser'
import {
  navMixin
} from "../mixins/core/navMixin";

const browser = detect()

export default {
  name: 'Nav',
  props: ['mode', 'isCollapse', 'mainMenu'],
  mixins: [navMixin],
  data() {
    return {
      isIe: true,
      isEdge: true,
      activeLink: null,
      parentMenu: [],
      subMenu: [],
      parentPath: ""
    }
  },
  methods: {
    goto(index, indexPath) {
      if (index !== null && index.charAt(0) === '/') {
        localStorage.setItem('parentPath', indexPath[1]);
        this.$router.push(index)
        this.$emit('push-page', {
          page: index
        })
      } else {
        localStorage.removeItem('parentPath');
      }
    },
    setLink(path) {
      this.activeLink = "/dashboard"
      let app = this
      setTimeout(function () {
        let parentPath = localStorage.getItem('parentPath')
        if (app.parentMenu.includes(path) && path !== "") {
          app.activeLink = path
        } else if (app.subMenu.includes(path) && path !== "") {
          app.activeLink = path
        } else if (parentPath !== null && parentPath !== "undefined" && path !== "/"){
          app.activeLink = parentPath
        }
      }, 100)
    },
    doSomething() {
      this.$store.dispatch(action.SELECT_COMPANY);
    }
  },
  created() {
    if (browser.name !== 'ie') this.isIe = false
    if (browser.name !== 'edge') this.isEdge = false
    
    this.setLink(this.$router.currentRoute.path)
    this.$router.afterEach((to, from) => {
      this.setLink(this.$router.currentRoute.path)
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';

.el-menu {
  border: none;
}

.el-menu::before,
.el-menu::after {
  display: none;
}

.el-menu-item.is-active {
  color: #ffffff;
}

.el-submenu,
.el-menu-item {
  .mdi {
    vertical-align: middle;
    margin-right: 5px;
    display: inline-block;
    width: 24px;
    text-align: center;
    color: red;
    font-size: 18px;
  }

  .icon-home {
    height: 20px;
    margin-right: 10px;
    margin-bottom: 5px;
  }

  .icon-white:before {
    color: #ffffff;
    font-size: 27px;
    margin-left: -6px;
  }
}
</style>

<style lang="scss">
@import '../assets/scss/_variables';

.main-navigation-menu {
  transition: width .5s;

  &:not(.el-menu--collapse) {
    .el-submenu__title,
    .el-menu-item {
      background-color: transparent !important;
    }

    &:not(.el-menu--horizontal) {
      .el-menu-item,
      .el-submenu {
        position: relative;

        &::before {
          content: '';
          display: block;
          width: 0px;
          height: 1px;
          position: absolute;
          bottom: 10px;
          left: 30px;
          background: $text-color;
          z-index: 1;
          opacity: 0;
          transition: all .7s cubic-bezier(.55, 0, .1, 1);
        }

        &:hover {
          &::before {
            width: 100px;
            opacity: 1;
            transform: translate(20px, 0);
          }
        }

        &.is-active {
          &::before {
            background: $text-color-accent;
          }
        }
      }
    }

    .el-submenu.is-opened {
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 2px;
        position: absolute;
        top: 40px;
        bottom: 10px;
        left: 31px;
        background: $text-color;
        z-index: 1;
        background: #ffffff;
      }

      &::before {
        display: none;
      }

      .el-menu-item,
      .el-submenu {
        &::before,
        &::after {
          display: none;
        }
      }
    }

    .el-menu-item-group__title {
      padding: 15px 0 0px 20px;
      color: transparentize($text-color, 0.65);
    }
  }

  .el-submenu__title .el-submenu__icon-arrow {
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
  }

  .el-submenu__title,
  .el-menu-item:not(.is-active) {
    color: #ffffff;

    i {
      color: #ffffff;
    }
  }

  &.el-menu--collapse {
    .el-menu-item-group__title {
      padding: 15px 0 0px 0px;
      width: 100%;
      text-align: center;
    }

    .el-submenu__title:hover,
    .el-menu-item:hover {
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
  }

  &.el-menu--horizontal {
    white-space: nowrap;
    overflow: hidden;
    display: table;

    &>* {
      float: inherit !important;
    }
  }

  &.nav-collapsed {
    .el-menu-item,
    .el-submenu__title {
      &>span {
        display: none;
      }
    }
  }
}

.main-navigation-submenu {
  .el-menu {
    background: #fff !important;

    .el-menu-item:not(.is-active) {
      color: #ffffff;
    }

    .el-menu-item:hover {
      background-color: transparentize($background-color, 0.3) !important;
    }
  }
}

.el-menu--vertical {
  background: #013A59;
  left: 100px;
  .el-menu-item {
    color: #ffffff;
  }
  .el-menu-item:hover {
    background-color: transparent !important;
  }
}

li.el-menu-item.is-active{
   .dot {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    left: 27px;
    background-color: white;
    top: 19px;
    border-radius: 50%;
  }
}
</style>
