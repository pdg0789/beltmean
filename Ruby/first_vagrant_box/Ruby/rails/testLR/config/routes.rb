Rails.application.routes.draw do
  resources :users, exclude: [:index]
  root 'application#index'

end
