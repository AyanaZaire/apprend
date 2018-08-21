class AddImgUrlToCourses < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :img_url, :string
  end
end
