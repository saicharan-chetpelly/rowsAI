from string import Template

DATA_TABLE_ROUTE_PREFIX = "/api/v1/data-table"
DATA_TABLE_TAGS = ["Data Table"]

ROUTE_CONFIGURATIONS = {
    "data_table": {
        "prefix": DATA_TABLE_ROUTE_PREFIX,
        "tags": DATA_TABLE_TAGS
    }
}

TAGS = ["Spreadsheet", "Pages", "User Query", "DeepDives", "QuickInsights"]

BASE_API_URL_PATH = "/api/v1"
SPREADSHEET_TEST_ENDPOINT = 'api/v1/spreadsheets'
SPREADSHEET_ID_TEXT = 'Id of spreadsheet'
SPREADSHEET_ENDPOINT = "/spreadsheets/{spreadsheet_id}"
PAGE_ENDPOINT = "/pages/{page_id}"
PAGE_ID_TEXT = "Id of the page"
DATA_TABLE_ENDPOINT = "/data-tables/{datatable_id}"
DATA_TABLE_ID_TEXT = "Id of data table"
QUERY_ID_TEXT = "Query of deepdive data"

DEEP_DIVES_GENERATION_PROMPT = Template("""
Context: Given a schema delimited by ``` , understand the schema and generate deep dives.
Role: As a proficient data analyst with expertise in SQL and data manipulation, your task is to extract key deep dives from the provided schema.
You possess strong knowledge of database structures and can efficiently derive deep dives from data.
When generating deep dives, please adhere to the provided guidelines strictly.
You will be provided with the SQL schema of a table. Your objective is to generate four(4) important deep dives based on the schema.
Deep dive is combination of two or three or some more rows.
Follow the rule strictly, ```#``` is representing a placeholder for each deep_dive.
Follow the rule strictly, Make sure you return the response in the output format only. The output should not contains list of numbers.
Input format:
    Schema: ```$schema```
Task: From the given schema, you are required to generate five components:
    1. A concise summary, limited to 10 to 15 words, summarizing the deep dive.
    2. An executable SQL query as a valid SQL script based on the schema, providing the necessary data for the deep dive. The script shuld generate the table for the deep dive.
    Repeat this process for the top four deep dives.
Output format:
[
    {
        "summary" : <Concise summary of the deep dive>,
        "sql_query" : <SQL script of the deep dive to generate the table>
    }
]
Example:
    Schema: ```$schema```
Output:
[
    {
        "summary": "The city of the table Sample",
        "sql_query": "SELECT CITY FROM A466C7F1_0_SAMPLE"
    },
    {
        "summary": "Get users name,email having age > 18",
        "sql_query": "SELECT name, email FROM users WHERE age > 18;"
    }
]
""")
DATA_TABLE_ID = "data_table.id"

USER_QUERY_SQL_GENERATION_PROMPT = Template("""
Context: Given a schema delimited by ``` ,  understand the schema and answer the given user question.
Role: As a proficient data analyst with expertise in SQL and data manipulation, your task is to interpret the provided schema and generate a response to the user query.
You possess strong knowledge of database structures and can efficiently extract insights from data.
When uncertain, you can indicate that you lack the necessary information. Please adhere to the provided guidelines strictly.
You will be provided with the SQL schema of a table and a user query use the table name given in schema. 
Your objective is to generate a response based on the user query by comprehending the key statistics and attributes of the data.
Follow the rule strictly, ```#``` is representing a placeholder.

Input format:
    Schema: ```$schema```
    User Query: ```$user_query```

Task: From the given schema and user query, you are required to generate three components:
    1. A concise summary, limited to 10 to 15 words, summarizing the response based on the user query only focus on giving the reachful response.
    2. An executable SQL query as a valid SQL script including the proper table name provided in schema, enabling database querying to obtain the relevant records for the given user query based on the schema.
    3. A brief insight providing a snapshot of the response, using placeholders for statistical values with the question.

Output format:
   {{
        "summary" : <Concise summary of the user query>,
        "sql_query" : <SQL script of the question>,
        "insight": <Insight of the user query>,
    }}

Example 1:
    User Query: Find the total sales revenue for the past month? 
Output: 
    {{
        "summary": "Total revenue for the sales department in past month",
        "sql_query": "SELECT SUM(revenue) AS total_revenue FROM sales WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH);",
        "insight": "The total sales in sale department in last month was # dollar"
    }}
    
Example 2:
    User Query: Give the name and email who has age greater than 18?
Output: 
    {{
        "summary": "Get users name,email having age > 18 ",
        "sql_query": "SELECT name, email FROM users WHERE age > 18;",
        "insight": "There are approximately # users who are above 18 years old."
    }}
""")

QUICK_INSIGHT_FORMAT_PROMPT = Template("""
Context: Given a quick insight template, and quick insight data delimited by ``` , understand the quick insight, 
and replace the placeholder indicated as ```#``` presents in quick insight with quick insight data. Follow the rule thoroughly and strictly.

 Input format:
    Quick Insight Template: $quick_insight_template
    Quick Insight Data: $quick_insight_data

Task: 
    1. Understand the quick insight and data properly.
    2. Replace the placeholder present in the Quick Insight Template with the actual data from the quick insight data.
    3. Return the response containing the quick insight data in almost 15-20 words.

Output format: 
    {{
        "quick_insight": <Quick insight with data>
    }}

Example 1:
    Quick Insight Template: The country with the highest number of companies present is # with # companies.
    Quick Insight Data: {'COUNTRY': 'CA', 'COMPANY_COUNT': 5}

Output:
    {{
        "quick_insight": "The country with most companies is CA with a total of 5 companies."
    }}

Example 2:
    Quick Insight Template: "The most popular product category is # with # products sold."
    Quick Insight Data: {'PRODUCT_CATEGORY': 'Electronics', 'PRODUCT_COUNT': 120}

Output:
    {{
        "quick_insight": "The most popular product category is Electronics with a total of 120 products sold."
    }}

""")

QUICK_INSIGHTS_ENDPOINT = "/quick-insights"
SPREADSHEET_ID_TITLE = "spreadsheet_id"
PAGE_ID_TITLE = "page_id"
DATATABLE_ID_TITLE = "datatable_id"

QUICK_INSIGHT_PROMPT = Template("""
Context: Given a schema delimited by ``` , understand the schema and generate quick insights.
Role: As a proficient data analyst with expertise in SQL and data manipulation, your task is to extract key insights from the provided schema.
You possess strong knowledge of database structures and can efficiently derive insights from data.
When generating insights, please adhere to the provided guidelines strictly.
You will be provided with the SQL schema of a table. Your objective is to generate four(4) quick insights based on the schema.
Follow the rule strictly, ```#``` is representing a placeholder for each quick_insight.
Follow the rule strictly, Make sure you return the response in the output format only. The output should not contains list of numbers.


Input format:
   Schema: ```$schema```


Task: From the given schema, you are required to generate five components:
   1. A concise summary, limited to 10 to 15 words, summarizing the insight.
   2. An executable SQL query as a valid SQL script based on the schema, providing the necessary data for the insight.
   Repeat this process for the top four insights.


Output format:
[
   {
       "insight": <Concise summary of insight including placeholder>,
       "sql_query" : <SQL script of the question>
   }
]
Example:
   Schema: ```$schema```


Output:
[
   {
       "insight": "The most common city in the dataset is #",
       "sql_query": "SELECT CITY, COUNT(CITY) AS city_count FROM A466C7F1_0_SAMPLE GROUP BY CITY ORDER BY city_count DESC LIMIT 1;"
   },
   {
       "insight": "The top 5 most common states in the dataset are #",
       "sql_query": "SELECT STATE, COUNT(STATE) AS state_count FROM A466C7F1_0_SAMPLE GROUP BY STATE ORDER BY state_count DESC LIMIT 5;"
   },
   {
       "insight": "The average length of first names in the dataset is # characters",
       "sql_query": "SELECT AVG(LENGTH(FIRST_NAME)) AS avg_first_name_length FROM A466C7F1_0_SAMPLE;"
   },
   {
       "insight": "The number of unique company names in the dataset is #",
       "sql_query": "SELECT COUNT(DISTINCT COMPANY_NAME) AS unique_company_count FROM A466C7F1_0_SAMPLE;"
   },
   {
       "insight": "The most common county in the dataset is #",
       "sql_query": "SELECT COUNTY, COUNT(COUNTY) AS county_count FROM A466C7F1_0_SAMPLE GROUP BY COUNTY ORDER BY county_count DESC LIMIT 1;"
   }
]
""")

QUICK_INSIGHTS_FORMAT_PROMPT = Template("""
Context: Given a quick insight template, and quick insight data delimited by ``` , understand the quick insight,
and replace the placeholder indicated as ```#``` presents in quick insight with quick insight data. Follow the rule thoroughly and strictly.
Follow the rule strictly, Make sure you return the response in the output format only.Dont return Input in output response.


Input format:
   Quick Insight Template: $quick_insight_template
   Quick Insight Data: $quick_insight_data


Task:
   1. Understand the quick insight and data properly.
   2. Replace the placeholder present in the Quick Insight Template with the actual data from the quick insight data.
   3. Return the response containing the quick insight data in almost 15-20 words.


Output format:
   {{
       "quick_insight": <Quick insight with data>
   }}


Example 1:
   Quick Insight Template: The country with the highest number of companies present is # with # companies.
   Quick Insight Data: {'COUNTRY': 'CA', 'COMPANY_COUNT': 5}


Output:
   {{
       "quick_insight": "The country with most companies is CA with a total of 5 companies."
   }}


Example 2:
   Quick Insight Template: "The most popular product category is # with # products sold."
   Quick Insight Data: {'PRODUCT_CATEGORY': 'Electronics', 'PRODUCT_COUNT': 120}


Output:
   {{
       "quick_insight": "The most popular product category is Electronics with a total of 120 products sold."
   }}


""")
