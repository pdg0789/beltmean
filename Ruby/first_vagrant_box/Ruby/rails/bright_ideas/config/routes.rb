Rails.application.routes.draw do
  resources :users, exclude: [:index]
  resources :ideas

  root 'users#index'
  get 'users/:id' => 'users#show'
  post 'users' => 'users#create'
  post 'login' => 'users#create'
  post 'sessions' => 'sessions#create'
  delete 'sessions/:id' => 'sessions#destroy'

  get 'ideas' => 'ideas#index'
  post 'ideas' => 'ideas#create'
  get 'ideas/:id' => 'ideas#show'
  delete 'ideas/:id' => 'ideas#destroy'

  post 'ideas/:id/likes' => 'likes#create'

end
