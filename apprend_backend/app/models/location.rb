class Location < ApplicationRecord
  has_many :courses
  has_many :categories, through: :courses 
end
