const mainRoute = (request, response) => {
    response.status(200).json("Main page");
}

module.exports = mainRoute;