if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI:'mongodb://kckartik17:web1708@ds139934.mlab.com:39934/vidjot-prod'}
}else{
  module.exports = {mongoURI:'mongodb://localhost/vidjot-dev'}
}