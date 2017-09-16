exports.logOut = (req, res) => {
   req.logout();
   res.redirect('/');
};
