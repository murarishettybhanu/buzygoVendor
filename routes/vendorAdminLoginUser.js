const axios = require('axios').default;

module.exports = async (req, res) => {
    try {
        let vendorAdminLogin = axios.post('http://3.7.88.75:8000/api/v1/user/login/', {
            ...req.body,
        })
            .then(function (response) {
                req.session.token = response.data.token;
                req.session.user_id = response.data.user_id;
                req.flash('LoginSuccess', 'Login Was Successful')
                res.redirect('/');
                console.log(response);
                return response;
            })
            .catch(function (error) {
                req.flash('LoginFail', 'Login Failed')
                res.redirect('/vendor/admin/login');
                console.log(error);
            });
    } catch (error) {
        console.log("[vendorAdminLoginUser e]", error);
        res.render("/vendor/admin/login")
    }
}
