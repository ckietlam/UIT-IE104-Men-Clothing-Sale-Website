const addSessionData = (req, res, next) => {
    res.locals.isAuthenticated = req.session.authenticated || false;
    res.locals.user = req.session.user || null;
    next();
};

export default addSessionData;
  