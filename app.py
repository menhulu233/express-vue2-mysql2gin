from flask import Flask as _Flask, flash
from flask import request, session, jsonify
from flask import render_template
from json import JSONEncoder
import service.users_data as user_service
import service.version_data as version_data

class MyEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return JSONEncoder.default(self, obj)


class Flask(_Flask):
    json_encoder = JSONEncoder


import os

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = os.urandom(24)



# -------------前台可视化大数据分析相关服务接口start-----------------
# 系统默认路径前台跳转
@app.route('/')
def main_page():
    return render_template("login.html")


# -------------前台可视化大数据分析相关服务接口end-----------------

# -------------后台管理模块相关服务接口start-----------------
# 登录
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        account = request.form.get('account')
        password = request.form.get('password')
        if not all([account, password]):
            flash('参数不完整')
            return "300"
        res = user_service.get_user(account, password)
        if res and res[0][0] > 0:
            session['is_login'] = True
            session['role'] = res[0][1]
            return "200"
        else:
            return "300"


# 登录页面跳转
@app.route('/admin')
def admin():
    if session.get("is_login"):
        if session.get('role') == 0:
            return render_template('index.html')
        else:
            return render_template('index.html')
    else:
        return render_template('login.html')


@app.route('/logout')
def logout():
    try:
        session.pop("is_login")
        return render_template('login.html')
    except Exception:
        return render_template('login.html')

@app.route('/welcome')
def welcome():
    return render_template('welcome.html')


# 后台首页面跳转
@app.route('/index1')
def index1():
    return render_template('index1.html')


# 后台注册跳转
@app.route('/html/reg')
def html_reg():
    return render_template('reg.html')

# -----------------用户管理模块START-----------------

# 用户管理页面
@app.route('/html/user')
def user_manager():
    return render_template('html/user.html')


# 获取用户数据分页
@app.route('/user/list', methods=["POST"])
def user_list():
    get_data = request.form.to_dict()
    page_size = get_data.get('page_size')
    page_no = get_data.get('page_no')
    param = get_data.get('param')
    data, count, page_list, max_page = user_service.get_user_list(int(page_size), int(page_no), param)
    return jsonify({"data": data, "count": count, "page_no": page_no, "page_list": page_list, "max_page": max_page})


# 注册用户数据
@app.route('/user/reg', methods=["POST"])
def user_reg():
    get_data = request.form.to_dict()
    name = str(get_data.get('username'))
    account = str(get_data.get('account'))
    password = str(get_data.get('password'))
    company = "平台注册"
    phone = " "
    mail = " "
    type = 1
    return user_service.add_user(name, account, password, company, phone, mail, type)


# 添加用户数据
@app.route('/user/add', methods=["POST"])
def user_add():
    get_data = request.form.to_dict()
    name = get_data.get('name')
    account = get_data.get('account')
    password = get_data.get('password')
    company = get_data.get('company')
    phone = get_data.get('phone')
    mail = get_data.get('mail')
    type = get_data.get('type')
    return user_service.add_user(name, account, password, company, phone, mail, type)


# 修改用户数据
@app.route('/user/edit', methods=["PUT"])
def user_edit():
    get_data = request.form.to_dict()
    id = get_data.get('id')
    name = get_data.get('name')
    password = get_data.get('password')
    company = get_data.get('company')
    phone = get_data.get('phone')
    mail = get_data.get('mail')
    type = get_data.get('type')
    user_service.edit_user(id, name, password, company, phone, mail, type)
    return '200'


# 删除用户数据
@app.route('/user/delete', methods=["DELETE"])
def user_delete():
    get_data = request.form.to_dict()
    id = get_data.get('id')
    user_service.del_user(id)
    return '200'


# -----------------用户管理模块END-----------------

# -----------------系统版本管理模块START-----------------

# 系统版本管理页面
@app.route('/html/version')
def version_manager():
    return render_template('html/version.html')


# 获取系统版本
@app.route('/version/show', methods=["POST"])
def version_show():
    res = version_data.get_sys_version()
    return jsonify({"data": res})


# 获取系统版本数据分页
@app.route('/version/list', methods=["POST"])
def version_list():
    get_data = request.form.to_dict()
    page_size = get_data.get('page_size')
    page_no = get_data.get('page_no')
    param = get_data.get('param')
    data, count, page_list, max_page = version_data.get_sys_version_list(int(page_size), int(page_no), param)
    return jsonify({"data": data, "count": count, "page_no": page_no, "page_list": page_list, "max_page": max_page})


# 新增系统版本数据
@app.route('/version/add', methods=["POST"])
def sys_version_add():
    get_data = request.form.to_dict()
    name = get_data.get('name')
    version = get_data.get('version')
    return version_data.add_sys_version(name, version)


# 修改系统版本数据
@app.route('/version/edit', methods=["PUT"])
def version_edit():
    get_data = request.form.to_dict()
    id = get_data.get('id')
    name = get_data.get('name')
    version = get_data.get('version')
    version_data.edit_sys_version(id, name, version)
    return '200'


# 删除系统版本数据
@app.route('/version/delete', methods=["DELETE"])
def version_delete():
    get_data = request.form.to_dict()
    id = get_data.get('id')
    version_data.del_sys_version(id)
    return '200'


# -----------------系统版本管理模块END-----------------



@app.route("/index")
def root():
    return render_template("index.html")

@app.route("/a")
def a():
    return render_template("2014年至2023年累计增长及当月增长.html")

@app.route("/b")
def b():
    return render_template("陕西省2022年和2023年每月发电量占比图.html")

@app.route("/c")
def c():
    return render_template("陕西省2023年每月发电量柱状图.html")

@app.route("/d")
def d():
    return render_template("陕西省2023年每月各类型发电产量.html")

@app.route("/e")
def e():
    return render_template("陕西省历年发电累计产量前10的月份.html")

@app.route("/f")
def f():
    return render_template("陕西省各类型发电产量占比.html")

# 数据可视化大屏页面跳转
@app.route('/bigscreen')
def bigscreen():
    return render_template('bigscreen.html')



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)

