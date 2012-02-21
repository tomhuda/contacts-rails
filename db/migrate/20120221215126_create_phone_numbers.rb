class CreatePhoneNumbers < ActiveRecord::Migration
  def change
    create_table :phone_numbers do |t|
      t.belongs_to :contact
      t.string :number

      t.timestamps
    end
  end
end
