const axios = require('axios').default;

module.exports = async (req, res) => {
    try {
        let valid_from = new Date(req.body.valid_from);
        let valid_to = new Date(req.body.valid_to);
        console.log(valid_from, valid_to);
        let createOffer = axios({
            method: 'post',
            url: 'http://3.7.88.75:8000/api/v1/vendor_store/offers/',
            headers: {
                'Authorization': `Token ${req.session.token}`
            },
            data: {
                ...req.body,
                store: req.session.store_id,
                offer_created_by: req.session.user_id,
                active: true,
                valid_from: valid_from,
                valid_to: valid_to,
            }
        })
            .then(function (response) {
                req.session.store_id = response.data.id
                req.flash('offerCreated', 'Added offer Successfully')
                res.redirect('/vendor/panel/offers');
                console.log(response.data);
                return response;
            })
            .catch(function (error) {
                req.flash('offerFail', 'Failed To Add offer')
                res.redirect('/vendor/panel/offers');
                console.log(error.response.data);
            });

    } catch (error) {
        console.log("[VendorSaveStore e]", error);
        req.flash('offerFail', 'Failed To Add offer')
        res.render("/")
    }
}
