<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white" style="padding: 30px 15px;">
      <el-row :gutter="10">
            <el-col :lg="12">
                <h2 style="margin: 0px;">Tax Setting Regulations</h2>
            </el-col>
        </el-row>
      <el-row :gutter="10">
        <el-col :lg="12">
        <table style="width:100%" ref="mos">
          <tr class="bg-blue header-row">
            <th class="text-left" colspan="3">Maximum Occupational Support</th>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>% from regular income</td>
            <td class="text-right"><input type="number" :disabled="editable"  class="input-tax mini-input" v-model="tax.masterOsPct" />%</td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>For a month (in IDR)</td>
            <td  class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterOsAmt" /></td>
          </tr>
        </table>
        <table style="width:100%">
          <tr class="bg-blue header-row">
            <th class="text-left" colspan="5">Tarif</th>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td colspan="2" style="width: 28%;">Tax Rate</td>
            <td colspan="2">Taxable Income limit</td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 1</td>
            <td>
              <input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterR1Pct" />%
            </td>
            <td style="width: 35%;">Up to</td>
            <td class="text-right">
              <input type="text" class="input-tax" :disabled="editable" v-model="tax.masterR1Amt" />
             </td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 2</td>
            <td><input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterR2Pct" />%</td>
            <td>-</td>
            <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterR2Amt" /></td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 3</td>
            <td><input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterR3Pct" />%</td>
            <td>-</td>
            <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterR3Amt"/></td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 4</td>
            <td><input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterR4Pct" />%</td>
            <td>-</td>
            <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterR4Amt"/></td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 5</td>
            <td><input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterR5Pct" />%</td>
            <td>-</td>
            <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterR5Amt"/></td>
          </tr>
        </table>
        <table style="width:100%" ref="serverance">
          <tr class="bg-blue header-row">
            <th class="text-left" colspan="5">Serverance Tax</th>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td colspan="2" style="width:28%;">Tax Rate</td>
            <td colspan="2">Taxable Income limit</td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 1</td>
            <td><input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterSev1Pct" />%</td>
            <td style="width: 35%;">Up to</td>
            <td><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterSev1Amt" /></td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 2</td>
            <td><input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterSev2Pct" />%</td>
            <td>-</td>
            <td><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterSev2Amt"/></td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 3</td>
            <td><input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterSev3Pct" />%</td>
            <td>-</td>
            <td><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterSev3Amt"/></td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 4</td>
            <td><input type="number" :disabled="editable" class="input-tax mini-input" v-model="tax.masterSev4Pct" />%</td>
            <td>-</td>
            <td><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterSev4Amt"/></td>
          </tr>
          <tr class="bg-grey-2 text-coral">
            <td>Rate 5</td>
            <td><input type="number" :disabled="editable"  class="input-tax mini-input" v-model="tax.masterSev5Pct" />%</td>
            <td>-</td>
            <td><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterSev5Amt"/></td>
          </tr>
        </table>
        </el-col>
        <el-col :lg="12" class="">
          <table style="width:100%" ref="tg">
            <tr class="bg-blue header-row">
              <th class="text-left" colspan="3">Tax by Government</th>
            </tr>
            <tr class="bg-grey-2 text-coral">
              <td>Lower Limit</td>
              <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterGovMin"/></td>
            </tr>
            <tr class="bg-grey-2 text-coral">
              <td>Upper Limit</td>
              <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="tax.masterGovMax"/></td>
            </tr>
          </table>
          <table style="width:100%" ref="nontax">
            <tr class="bg-blue header-row">
              <th class="text-left" colspan="3">Non Taxable Income</th>
            </tr>
            <template v-for="(item,id) in tax.ptkps">
              <tr :key="id" class="bg-grey-2 text-coral">
                <td style="width:13%;">{{item.masterCode}}</td>
                <td style="width:45%;">{{item.masterDescription}}</td>
                <td class="text-right">
                  <input type="text" class="input-tax" :disabled="editable"  v-model="item.masterAmt"/>
                </td>
              </tr>
            </template>
            <tr class="bg-blue header-row">
              <th class="text-left" colspan="5">
                <input type="checkbox" id="netgross" :disabled="editable" style="vertical-align: middle; margin-right:10px;" v-model="tax.masterNog">
                <label for="netgross">Use Net Gross Method</label>
              </th>
            </tr>
          </table>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" round @click="edit()">Edit</el-button>
        <el-button type="info" round plain v-if="editable" >Save</el-button>
        <el-button type="success" round v-else @click="saveSetting()">Save</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import Swal from "sweetalert2";

export default {
  name: "LisUser",
  data() {
    return {
      berak: "",
      editable: true,
      nonGross: 1
    };
  },
  computed: {
    ...mapGetters({
      tax : getter.GET_TAX_REGULATIONS,
    }),
  },
  watch: {
    'tax.masterOsPct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterOsPct = 100
      }
    },
    'tax.masterOsAmt' (val) {
      this.tax.masterOsAmt = this.amount(val);
    },
    // Tarif (rate)
    'tax.masterR1Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterR1Pct = 100
      }
    },
    'tax.masterR2Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterR2Pct = 100
      }
    },
    'tax.masterR3Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterR3Pct = 100
      }
    },
    'tax.masterR4Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterR4Pct = 100
      }
    },
    'tax.masterR5Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterR5Pct = 100
      }
    },
    // Tarif (Amount)
    'tax.masterR1Amt' (val) {
      this.tax.masterR1Amt = this.amount(val);
    },
    'tax.masterR2Amt' (val) {
      this.tax.masterR2Amt = this.amount(val);
    },
    'tax.masterR3Amt' (val) {
      this.tax.masterR3Amt = this.amount(val);
    },
    'tax.masterR4Amt' (val) {
      this.tax.masterR4Amt = this.amount(val);
    },
    'tax.masterR5Amt' (val) {
      this.tax.masterR5Amt = this.amount(val);
    },
    // Serverance (Rate)
    'tax.masterSev1Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterSev1Pct = 100
      }
    },
     'tax.masterSev2Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterSev2Pct = 100
      }
    },
     'tax.masterSev3Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterSev3Pct = 100
      }
    },
     'tax.masterSev4Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterSev4Pct = 100
      }
    },
     'tax.masterSev5Pct' (val) {
      if(parseInt(val) > 100) {
        this.tax.masterSev5Pct = 100
      }
    },
    // Serverance (amount)
    'tax.masterSev1Amt' (val) {
      this.tax.masterSev1Amt = this.amount(val);
    },
    'tax.masterSev2Amt' (val) {
      this.tax.masterSev2Amt = this.amount(val);
    },
    'tax.masterSev3Amt' (val) {
      this.tax.masterSev3Amt = this.amount(val);
    },
    'tax.masterSev4Amt' (val) {
      this.tax.masterSev4Amt = this.amount(val);
    },
    'tax.masterSev5Amt' (val) {
      this.tax.masterSev5Amt = this.amount(val);
    },
    // Government Tax
    'tax.masterGovMax' (val) {
      this.tax.masterGovMax = this.amount(val);
    },
    'tax.masterGovMin' (val) {
      this.tax.masterGovMin = this.amount(val);
    },
  },
  mounted() {
    this.getTaxSetting();
  },

  methods: {
    edit() {
      this.editable = !this.editable;
        this.$notify({
          title: 'Success',
          message: this.editable ? 'Disabled edit mode' : 'Activate the edit mode',
          type: 'success'
        });
    },
    replaceDot(amount) {
      return amount.replace(".", "");
    },
    saveSetting() {
      const payload = {
        masterVersion: this.tax.masterVersion,
        masterEffectiveDate: this.tax.masterEffectiveDate,
        masterYear: this.tax.masterYear,
        masterOsPct: this.tax.masterOsPct,
        masterOsAmt: this.replaceDot(this.tax.masterOsAmt),
        masterR1Pct: this.tax.masterR1Pct,
        masterR1Amt: this.replaceDot(this.tax.masterR1Amt),
        masterR2Pct: this.tax.masterR2Pct,
        masterR2Amt: this.replaceDot(this.tax.masterR2Amt),
        masterR3Pct: this.tax.masterR3Pct,
        masterR3Amt: this.replaceDot(this.tax.masterR3Amt),
        masterR4Pct: this.tax.masterR4Pct,
        masterR4Amt: this.replaceDot(this.tax.masterR4Amt),
        masterR5Pct: this.tax.masterR5Pct,
        masterR5Amt: this.replaceDot(this.tax.masterR5Amt),
        masterSev1Pct: this.tax.masterSev1Pct,
        masterSev1Amt: this.replaceDot(this.tax.masterSev1Amt),
        masterSev2Pct: this.tax.masterSev2Pct,
        masterSev2Amt: this.replaceDot(this.tax.masterSev2Amt),
        masterSev3Pct: this.tax.masterSev3Pct,
        masterSev3Amt: this.replaceDot(this.tax.masterSev3Amt),
        masterSev4Pct: this.tax.masterSev4Pct,
        masterSev4Amt: this.replaceDot(this.tax.masterSev4Amt),
        masterSev5Pct: this.tax.masterSev5Pct,
        masterSev5Amt: this.replaceDot(this.tax.masterSev5Amt),
        masterGovMin: this.replaceDot(this.tax.masterGovMin),
        masterGovMax: this.replaceDot(this.tax.masterGovMax),
        masterNog: this.tax.masterNog ? 1 : 0,
        ptkps: this.tax.ptkps
      }
      this.$store.dispatch(action.POST_TAX_SETTING, payload).then(res=> {
            if(res.status == 200) {
             this.$store.dispatch(action.LIST_TAX_ROLE);
             this.editable = true;
             Swal("Succes!", "The setting are saved", "success");
            }
        }).catch(err=> {
            console.log(err)
        });
    },
    amount(angka) {
      let number_string = angka.toString().replace(/[^,\d]/g, '');
			let split   		= number_string.split(',');
			let sisa     		= split[0].length % 3;
			let rupiah     	= split[0].substr(0, sisa);
			let ribuan      = split[0].substr(sisa).match(/\d{3}/gi);

			// tambahkan titik jika yang di input sudah menjadi angka ribuan
			if(ribuan){
				let separator = sisa ? '.' : '';
				rupiah += separator + ribuan.join('.');
			}
      return split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
      // rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	    // return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    },
    isNumber (evt) {
      evt = (evt) || window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    getTaxSetting() {
      this.$store.dispatch(action.LIST_TAX_ROLE);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.el-row {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  padding: 0 10px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}


td {
  padding: 10px;
}
.bg-blue {
  background: #043060;
}
.header-row {
  color: white;
}
.header-row > th {
  padding: 5px 10px;
}
.bg-grey-2 {
  background: #e0e0e0;
}
.text-coral {
  color: #181818;
}
.input-tax {
  border: none;
  background: transparent;
  display: inline-block;
  font-size: 16px;
  text-align: right;
}
.mini-input {
  width: 30px;
}
.input-tax:focus {
  outline: none;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>