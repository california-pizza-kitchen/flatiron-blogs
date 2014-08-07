Rails.application.routes.draw do
  root to: 'entries#index'

  resources :semesters, :param => :slug, only: [:index, :show]
  resources :bloggers, only: [:index]

  get '/:slug', to: 'entries#show'
end
