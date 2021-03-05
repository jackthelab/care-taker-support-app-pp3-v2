class CreateCheckIns < ActiveRecord::Migration[5.2]
  def change
    create_table :check_ins do |t|
      t.integer :score
      t.string :comment
      t.references :member, foreign_key: true

      t.timestamps
    end
  end
end
