const getTermsAndConditions = (req, res) => {
    return res.render("pages/placeholder/terms-and-conditions");
};

const getCustomerSupport = (req, res) => {
    return res.render("pages/placeholder/customer-supports");
}

const getTerms = (req, res) => {
    return res.render("pages/placeholder/terms");
}

const getCopyRight = (req, res) => {
    return res.render("pages/placeholder/copyright");
}
const getOrderingRules = (req, res) => {
    return res.render("pages/placeholder/ordering-rules");
}

const getDeliveringRules = (req, res) => {
    return res.render("pages/placeholder/delivering-rules");
}

const getFrequentQuestions = (req, res) => {
    return res.render("pages/placeholder/frequent-questions");
}
module.exports = {
    getTermsAndConditions,
    getCustomerSupport,
    getTerms,
    getCopyRight,
    getOrderingRules,
    getDeliveringRules,
    getFrequentQuestions
};
