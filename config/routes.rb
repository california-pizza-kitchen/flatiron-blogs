Rails.application.routes.draw do
  root to: 'entries#index'
  get '/blogroll', to: 'bloggers#index'

  resources :semesters, :param => :slug, only: [:index, :show]

  get '/:slug', to: 'entries#show'
end
