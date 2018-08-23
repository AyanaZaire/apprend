class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :description
      t.string :time
      t.string :date

      t.timestamps
    end
  end
end
