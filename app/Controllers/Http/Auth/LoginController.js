'use strict'

const {validateAll}=use('Validator')
const User= use('App/Models/User')
const Hash = use('Hash')

class LoginController {
    index({view}){
        return view.render('auth.login')
        //return 'HolaMundo1';
    }

    async login({request,auth, session, response}){
        
        //validación
        const validation = await validateAll(request.all(),{
            email: 'required|email',
            password: 'required'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password'])     
            return response.redirect('back')       
        }

        //buscar usuario y verificar
        const {email ,password}= request.all()
        const user = await User.query().where('email',email).where('is_active',true).first()

        if (user) {
           
            const passwordVerified = await Hash.verify(password, user.password)

            if (passwordVerified) {
        
              await auth.login(user)
      
              return response.route('store')
            }
          }
      

      //redireccion con mensaje a usuario
      session.flash({
        notification: {
          type: 'danger',
          message: 'Usuario no encontrado.'
        }
      })
  
    return response.redirect('back')

    
    }
}

module.exports = LoginController
