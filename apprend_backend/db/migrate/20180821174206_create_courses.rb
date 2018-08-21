class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :description
      t.time :time
      t.date :date

      t.timestamps
    end
  end
end
