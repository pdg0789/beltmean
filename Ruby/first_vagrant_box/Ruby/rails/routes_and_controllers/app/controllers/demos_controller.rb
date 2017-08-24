class DemosController < ApplicationController
  def index
    render text: "What do you want me to day?"
  end

  def hello
    render text: "Hello Coding Dojo!"
  end

  def say
    unless params[:name]
      render text: "Saying Hello!"
    else
      if params[:name] == "michael"
        redirect_to "/say/hello/joe"
      else
        render text: "Saying Hello #{params[:name]}!"
      end
    end
  end

  def times
    # if session[:count] exists, leave it as is. Else set it to 0
    session[:count] ||= 0
    render text: "You have visited this url #{session[:count] += 1} time(s)"
  end

  def restart
    reset_session
    render text: "Destroyed Session"
  end
end
