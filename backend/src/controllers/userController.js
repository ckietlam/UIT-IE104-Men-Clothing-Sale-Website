const getAdmin = async (req, res) => {
    return res.render('pages/admin', { 
        message: null
    });
}
module.exports = {
    getAdmin
}