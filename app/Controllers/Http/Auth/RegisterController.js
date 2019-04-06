'use strict'

const {validateAll}=use('Validator')
const User= use('App/Models/User')

class RegisterController {

    index({view}){
        return view.render('auth.register')
        //return 'HolaMundo1';
    }

    async register({request, session, response}){
        
        //validación
        const validation = await validateAll(request.all(),{
            id: 'required|number|unique:users,NIUP',
            name: 'required',
            email: 'required|email|unique:users,email',
            phone: 'required|number|unique:users,phone',
            password: 'required'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password'])     
            return response.redirect('back')       
        }

        //crear usuario
        const user = await User.create({
            name: request.input('name'),
            email: request.input('email'),
            password: request.input('password'),
            NIUP: request.input('id'),
            phone: request.input('phone'),
            roll: 'client',
            is_active: 1

      })

      //redireccion con mensaje a usuario
      session.flash({
        notification: {
          type: 'success',
          message: 'Usuario registrado satisfactoriamente.'
        }
      })
  
    return response.redirect('login')

    
    }
}

module.exports = RegisterController
