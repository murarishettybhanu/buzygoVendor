module.exports = async (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/')
        })
    } catch (error) {
        console.log("[routes:logout] e", error);
        res.redirect("/vendor/home/page");
    }
}