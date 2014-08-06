Rails.application.routes.draw do
  root to: 'entries#index'

  resources :semesters, :param => :slug, only: [:show]
  resources :bloggers, only: [:index]

  get '/:slug', to: 'entries#show'

end
