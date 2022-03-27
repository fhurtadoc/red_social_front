class UserModel {
  
  constructor (data){
    this.email=data.email        
    this.nickname=data.nickname
    this.password=data.password
    this.status=data.status    
  }
}

module.exports=UserModel;