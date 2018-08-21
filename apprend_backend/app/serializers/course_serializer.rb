class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :time, :date

  belongs_to :category
  belongs_to :location
end
