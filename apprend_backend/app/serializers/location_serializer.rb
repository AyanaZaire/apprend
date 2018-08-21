class LocationSerializer < ActiveModel::Serializer
  attributes :id, :city

  has_many :courses
end
