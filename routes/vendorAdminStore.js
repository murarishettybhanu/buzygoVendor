const axios = require('axios').default;

module.exports = async (req, res) => {
    try {
        let vendorAdminResigister = axios.post('http://3.7.88.75:8000/api/v1/user/user_account/', {
            ...req.body,
            "roles": [3],
        })
            .then(function (response) {
                req.flash('RegistrationSuccess', 'Registration Was Successful')
                res.redirect('/vendor/admin/login');
                console.log(response);
                return response;
            })
            .catch(function (error) {
                req.flash('RegistrationFail', 'Registration Failed')
                res.redirect('/vendor/admin/register');
                console.log(error);
            });
    } catch (error) {
        console.log("[vendorAdminResigister e]", error);
        res.render("/vendor/admin/register")
    }
}
