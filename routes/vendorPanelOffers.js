const axios = require('axios').default;

module.exports = async(req, res) => {
    try {
        console.log(req.session.store_id);
        let getStoreOffers = await axios({
            method: 'get',
            url: `http://3.7.88.75:8000/api/v1/vendor_store/offers/?store=${req.session.store_id}`,
            headers: {
                'Authorization': `Token ${req.session.token}`
            },
            data: {
            }
        })
            .then(function (response) {
                res.render('vendorPanelOffers', { offers: response.data, getUserDetails: req.session.user_info });
                return response;
            })
            .catch(function (error) {
                res.redirect("/vendor/home/page");
                console.log(error.response);
                return error.response.data
            });

    } catch (error) {
        console.log("[vendorPanelOffers e]", error);
        res.redirect("/vendor/home/page");
    }
}
