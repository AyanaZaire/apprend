class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :time, :date, :img_url

  belongs_to :category
  belongs_to :location
end
