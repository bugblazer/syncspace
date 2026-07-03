function home(req, res) {
    res.status(200).json({
        success: "true",
        message: "Welcome to the SyncSpace API",
    });
}

module.exports = {
    home
};