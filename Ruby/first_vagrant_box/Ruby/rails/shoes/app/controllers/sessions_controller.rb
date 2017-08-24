class SessionsController < ApplicationController
  def create
    @user = User.find_by_email(params[:email])

    if @user
      if @user.try(:authenticate, params[:password])
        session[:user_id] = @user.id
        return redirect_to '/shoes'
      end
      flash[:errors] = ["Password invalid"]
    end

    flash[:errors] = ["Email invalid"]
    return redirect_to :back
  end

  def destroy
    session.clear
    return redirect_to '/'
  end
end
