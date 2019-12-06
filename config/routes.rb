Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth', controllers:
  {
    registrations: 'registrations',
  }

  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  get 'api/moose/show', to: 'api/moose#show'
  get 'api/user/show', to: 'api/users#show'
  get 'api/user/click', to: 'api/users#click'
  get 'api/user/myMoose', to: 'api/users#myMoose'

end
