class CreateSupportGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :support_groups do |t|
      t.string :name
      t.string :topic
      t.string :meeting_day
      t.string :location

      t.timestamps
    end
  end
end
