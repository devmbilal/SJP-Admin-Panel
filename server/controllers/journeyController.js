
exports.homepage = async (req, res) => {


    const locals = {
        title: 'Admin Panel',
        description: 'Smart Journey Planner-Road Safety Project',
    }

    res.render('index', { locals });

}