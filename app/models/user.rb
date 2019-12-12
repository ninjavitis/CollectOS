# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :mooses
  has_many :collectibles, dependent: :destroy

  include DeviseTokenAuth::Concerns::User

  def createMoose(user_id)
    Moose.create(
    user_id:user_id,
    name: 'defaultMoose',
    variant: 'Standard Moose',
    magic: false,
    clicks: 0,
    level: 1, 
    clicksToLevel: 5,
    )
  end

end
