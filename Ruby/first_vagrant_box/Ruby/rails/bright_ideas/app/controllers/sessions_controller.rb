class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create]
  def create
    @user = User.find_by_email(params[:email]).try(:authenticate, params[:password])
    if user
      session[:user_id] = user.id
      return redirect_to "/ideas"
    else
      flash[:errors] = ['Does not match our records lol']
      return redirect_to :back
    end
  end
# dont forget if the user id isnt in session
  def destroy
      session[:user_id] = nil
      return redirect_to '/'
  end


end
