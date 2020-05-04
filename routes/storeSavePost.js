var request = require('request');
var fs = require('fs');
const path = require("path")

module.exports = async (req, res) => {
    try {
        let postImg = req.files.postImg;
        await postImg.mv(path.resolve(__dirname, '..', postImg.name));
        var filepath = path.resolve(__dirname, '..', postImg.name);

        var options = {
            'method': 'POST',
            'url': 'http://3.7.88.75:8000/api/v1/vendor_store/post/',
            'headers': {
                'Authorization': 'Token ' + req.session.token
            },
            formData: {
                'store': req.session.store_id,
                'offer_created_by': req.session.user_id,
                'image': {
                    'value': fs.createReadStream(filepath),
                    'options': {
                        'filename': postImg.name,
                        'contentType': null
                    }
                },
                'title': req.body.title,
                'description': req.body.description,
                'active': "true"
            }
        };
        console.dir(options.formData);
        request(options, function (error, response) {
            if (error) {
                throw new Error(error);
            }
            else {
                fs.unlink(path.resolve(__dirname, '..', postImg.name), (err, succ) => {
                    if (!err) console.log("successfully Deleted");
                });
                console.log(JSON.parse(response.body));
                req.flash('postSuccess', 'Successfully Added Post')
                res.redirect('/vendor/panel/posts')
            }
        });


    } catch (error) {
        console.log("[VendorSaveStore e]", error);
        req.flash('postFail', 'Failed To Add Post')
        res.render("/")
    }
}
