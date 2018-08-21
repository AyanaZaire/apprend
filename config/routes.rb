Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :courses, :categories, :locations
    end
  end
end
