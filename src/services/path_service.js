//store/module/users/login
export const login                      = 'uma/user/login';
export const logout                     = 'uma/user/logout';
export const user_profile               = '/uma/user/get';
export const user_menus                 = '/uma/menus/roles';
export const menu_top                   = '/uma/menus/top-level';
export const menu_list                  = '/uma/menus/list';
export const post_menu                  = '/uma/roles/menus';

//store/module/users/forgot_password
export const reset_password             = 'uma/password/reset';
export const create_password            = 'uma/password/create';
export const forgot_password            = 'uma/password/request-reset';
export const role_access                = 'uma/roles/checkpayrollmenu';
export const change_password            = 'uma/password/reset';
export const check_token                = 'uma/password/check';

//store/module/enterprise
export const enterprise_page            = '/enterprise?page=';
export const enterprise                 = '/enterprise';
export const user                       = '/user/'

//store/module/pma
export const get_payrolls               = 'pma/payrolls/latest';

//store/module/enterprise
export const inspector_page             = '/inspector?page=';
export const inspector                  = '/inspector/'

//vendor
export const vendor                     ='/vendor';


//store/module/tasktemplate
export const tasktemplate_page          = '/task-template?page=';
export const tasktemplate               = '/task-template';

//store/module/dispathcer
export const dispatcher_page            = '/dispatcher?page=';
export const dispatcher                 = '/dispatcher/';
export const dispatcher_role            = '/dispatcher?role=';
export const search_dispatcher          = '/dispatcher?q=';
export const assign_to_enteprise        = '/dispatcher/assign-to-enterprise';

//store/module/order-list
export const order_open                 = '/order/open?page=';
export const order                      = '/order/';
export const order_assign               = '/order/assign';
export const bulk_order_template        = '/order/templateorder';
export const import_bulk_order          = '/import/order'

//store/module/vendor
export const vehicle                    = '/vehicle/'

//store/module/tracking
export const tracking                   = '/tracking/'

//store/module/notification
export const notification               = 'notification/'

//gco
export const holding_type               = 'gco/lovs/list/' // need params_id
export const regencies                  = 'gco/regencies/list' // query "param"
export const country                    = 'gco/country/list'
export const master_tax                 = 'gco/master/tax/regulations' // nee params_id