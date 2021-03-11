Rails.application.routes.draw do
  resources :check_ins
  resources :memberships
  resources :support_groups
  resources :members
  
  get '/members/:id/memberships', to: 'members#get_memberships'
  get '/members/:id/check_ins', to: 'members#get_check_ins'
end
