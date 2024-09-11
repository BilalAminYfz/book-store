exports.getError=(req,res,next)=>{   
    console.log('page not found');
      
    res.status(404).render('error',
    {pageTitle: 'Page Not Found',
    path:'/error'
    });

}