const axios = require('axios').default;

module.exports = (req, res) => {
  try {
    console.log(req.session.token)
    let getStoreOffers = axios({
      method: 'get',
      url: `http://3.7.88.75:8000/api/v1/vendor_store/post?store=${req.session.store_id}`,
      headers: {
        'Authorization': `Token ${req.session.token}`
      },
      data: {
      }
    })
      .then(function (response) {
        res.render('vendorPanelPosts', { posts: response.data, getUserDetails: req.session.user_info });
        // console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        res.render('vendorPanelPosts', { error: error.response.data });
        console.log(error.response);
        return error.response.data
      });

  } catch (error) {

  }
}
