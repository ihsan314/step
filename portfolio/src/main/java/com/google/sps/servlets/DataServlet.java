// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that adds/retrieves comments stored in a Datastore */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  private static final int DEFAULT_MAX_NUM_COMMENTS = 7;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json;");

    Map<String, String> messages = new LinkedHashMap<>();
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    int maxNumComments = (int)request.getSession().getAttribute("maxNumComments");
    for (Entity entity : results.asIterable(FetchOptions.Builder.withLimit(maxNumComments))) {
      String username = (String) entity.getProperty("username");
      String message = (String) entity.getProperty("message");
      messages.put(username, message);
    }

    String json = new Gson().toJson(messages);
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String username = request.getParameter("username");
    String message = request.getParameter("comment-or-question");
    String maxNumCommentsString = request.getParameter("max-num-comments");
    int maxNumComments;
    try {
      maxNumComments = Integer.parseInt(maxNumCommentsString);
    } catch (NumberFormatException e) {
      System.err.format("Could not convert to int: %s%n", maxNumCommentsString);
      System.err.format("Using default value of %d.%n", DEFAULT_MAX_NUM_COMMENTS);
      maxNumComments = DEFAULT_MAX_NUM_COMMENTS;
    }
    request.getSession().setAttribute("maxNumComments", maxNumComments);

    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("username", username);
    commentEntity.setProperty("message", message);
    commentEntity.setProperty("timestamp", System.currentTimeMillis());

    datastore.put(commentEntity);
    response.sendRedirect("/index.html");
  }
}
