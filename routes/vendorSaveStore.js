const axios = require('axios').default;

module.exports = async (req, res) => {
    try {
        // let files = req.files;
        // var bodyFormData = new FormData();
        // for (i = 0; i < files.store_images.length; i++) {
        //     bodyFormData.append(`store_image${i}`, files.store_images[i]);
        // }
        let createStore = axios({
            method: 'post',
            url: 'http://3.7.88.75:8000/api/v1/vendor_store/vendor_store_details/',
            headers: {
                'Authorization': `Token ${req.session.token}`
            },
            data: {
                store_user: req.session.user_id,
                ...req.body,
            }
        })
            .then(function (response) {
                req.session.store_id = response.data.id
                req.flash('StoreCreated', 'Added Store Successfully')
                res.redirect('/');
                console.log(response.data);
                return response;
            })
            .catch(function (error) {
                req.flash('StoreFail', 'Failed To Add Store')
                res.redirect('/');
                console.log(error.response);
            });

        // uploadImages();

        // function uploadImages() {
        //     let UploadImages = axios({
        //         method: 'post',
        //         url: `http://3.7.88.75:8000/api/v1/vendor_store/vendor_store_details/${req.session.store_id}/upload_store_images/`,
        //         headers: {
        //             'Authorization': `Token ${req.session.token}`,
        //             'Content-Type': 'multipart/form-data'
        //         },
        //         data: bodyFormData
        //     })
        //         .then(function (response) {
        //             console.log(response.data)
        //             return response;
        //         })
        //         .catch(function (error) {
        //             console.log(error.response);
        //         });
        //     return UploadImages;
        // }
    } catch (error) {
        console.log("[VendorSaveStore e]", error);
        req.flash('StoreFail', 'Failed To Add Store')
        res.render("/")
    }
}
