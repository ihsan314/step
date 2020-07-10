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

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.LinkedHashMap;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  // LinkedHashMap<String, String> messages = new LinkedHashMap<String, String>();
  // ArrayList<String> messages = new ArrayList<String>();
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  List<Key> keys = new ArrayList<>();
  int maxNumComments;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json;");

    LinkedHashMap<String, String> messages = new LinkedHashMap<String, String>();
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity: results.asIterable(FetchOptions.Builder.withLimit(maxNumComments))) {
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
    // messages.put(username, message);
    // messages.add(username);
    String maxNumCommentsString = request.getParameter("max-num-comments");
    try {
      maxNumComments = Integer.parseInt(maxNumCommentsString);
    } catch (NumberFormatException e) {
      System.err.println("Could not convert to int: " + maxNumCommentsString);
      System.err.println("Using default value of 7.");
      maxNumComments = 7;
    }

    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("username", username);
    commentEntity.setProperty("message", message);
    commentEntity.setProperty("timestamp", System.currentTimeMillis());

    keys.add(datastore.put(commentEntity));

    response.sendRedirect("/index.html");
  }
}
