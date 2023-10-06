const Stop = require('../../models/stop/Stop');
const mongoose = require('mongoose');

exports.homepage = async (req, res) => {

    const messages = req.flash('info');

    const locals = {
        title: 'Admin Panel',
        description: 'Smart Journey Planner-Road Safety Project',
    }

       let perPage = 12;
       let page = req.query.page || 1;

    try {
      const stops = await Stop.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Stop.count();

      res.render('index', {
        locals,
        stops,
        current: page,
        pages: Math.ceil(count / perPage),
        messages
      });

    } catch (error) {
      console.log(error);
    }
}