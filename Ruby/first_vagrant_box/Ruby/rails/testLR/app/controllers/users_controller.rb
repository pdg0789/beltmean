class UsersController < ApplicationController
  def create

    @user = User.new(user_params)

    if @user.valid?
            flash[:notice] = ["Registered successfully"]
            session[:user_id] = @user.id
            return redirect_to '/users'
    end
    errors = @user.errors.full_messages + @location.errors.full_messages
    flash[:errors] = errors
    return redirect_to :back
  end

  private
      def user_params
          params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation).merge(location: @location)
      end
end
