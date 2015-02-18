Rails.application.routes.draw do
  root to: 'statics#plan'

  get '/plan', to: 'statics#plan', as: :plan
  get '/shop', to: 'statics#shop', as: :shop
  get '/cook', to: 'statics#cook', as: :cook

  resources :items do
    collection do
      put :archive_complete
      put :archive_all
    end
  end
end
