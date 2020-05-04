const axios = require('axios').default;

module.exports = async (req, res) => {
  try {
    let getStoreByUser = await axios({
      method: 'get',
      url: `http://3.7.88.75:8000/api/v1/vendor_store/vendor_store_details/get_store_details_user/?user=${req.session.user_id}`,
      headers: {
        'Authorization': `Token ${req.session.token}`
      },
      data: {
      }
    })
      .then(function (response) {
        req.session.store_id = response.data.id
        return response;
      })
      .catch(function (error) {
        res.redirect("/");
        console.log(error.response);
        return error.response
      });

    let getUserDetails = await axios({
      method: 'get',
      url: `http://3.7.88.75:8000/api/v1/user/user_account/${req.session.user_id}`,
      headers: {
        'Authorization': `Token ${req.session.token}`
      },
      data: {
      }
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        res.redirect("/");
        console.log(error.response);
        return error.response
      });
    req.session.user_info = getUserDetails;

    res.render('index', { getStoreByUser, getUserDetails });
  } catch (error) {
    console.log("[index e]", error);
    res.redirect("/");
  }
}
