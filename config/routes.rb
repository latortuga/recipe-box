Rails.application.routes.draw do
  root to: 'statics#index'

  resources :items
end
