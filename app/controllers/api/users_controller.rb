class Api::UsersController < ApplicationController
  # Uncomment this when user registrations are working

  def show
    if current_user
      render json: current_user
    else
      render json: current_user.errors, status:422
    end
  end

  def click
    User.click(current_user, active_moose)
    current_user
    render json: {moose:active_moose, user:current_user}
    # {mooseClicks:active_moose.clicks, user:current_user.remainingClicks}
  end

  private

  def active_moose
    active_moose = Moose.find_by(id:current_user.activeMoose)
  end

end